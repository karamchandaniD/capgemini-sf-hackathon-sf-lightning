({
	initAccountRecCreator : function(cmp){
        // Prepare a new record from template
        cmp.find("accountRecordCreator").getNewRecord(
            "Account", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = cmp.get("v.newAccount");
                var error = cmp.get("v.newAccountError");
                
        cmp.set('v.isShow',true);
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
	},
    handleSaveAccount: function(cmp){
        var self = this;
        var accname = cmp.get('v.simpleNewAccount.Name');
        if(accname){
            accname = accname.trim()
        }
        if(!accname){
            self._showToast(cmp, {title:'Account Creation',
                                  message:'Account Name is required!',
                                  type:'error'});
            return;
        }
        $A.util.removeClass(cmp.find('newSpinner'), 'slds-hide');
        cmp.find("accountRecordCreator").saveRecord(
            function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    self.loadAccount(cmp,saveResult.recordId);
                    self._showToast(cmp, {title:'Account Creation',
                                          message:'Account Created Successfully!',
                                          type:'success'});
                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                    self._showToast(cmp, {title:'Account Creation',
                                          message:'Incompletion',
                                          type:'error'});
                    $A.util.addClass(cmp.find('newSpinner'), 'slds-hide');
                    window.setTimeout(
                        $A.getCallback(function() {
                            cmp.set("v.isCreate", false);
                        }), 100
                    );
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    self._showToast(cmp, {title:'Account Creation',
                                          message:JSON.stringify(saveResult.error),
                                          type:'error'});
                    $A.util.addClass(cmp.find('newSpinner'), 'slds-hide');
                    window.setTimeout(
                        $A.getCallback(function() {
                            cmp.set("v.isCreate", false);
                        }), 100
                    );
                    console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                    $A.util.addClass(cmp.find('newSpinner'), 'slds-hide');
                    window.setTimeout(
                        $A.getCallback(function() {
                            cmp.set("v.isCreate", false);
                        }), 100
                    );
                }
                
            }
        );
    },
    loadAccount : function(cmp, recId){
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = cmp.get("c.getAccount");
        action.setParams({accId:recId});
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {

                var accList = response.getReturnValue();
                var techCAccountDML = $A.get("e.c:TechcAccountDML");
                techCAccountDML.setParams(
                    {
                        data:{
                            source:'insert',
                            rec:accList
                        }
                    }
                )
                techCAccountDML.fire();
                cmp.set("v.isCreate", false);
            }else if (state === "INCOMPLETE") {
                // do something
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    _showToast : function(cmp, toast) {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent != 'undefined' && toastEvent != undefined) {
            toastEvent.setParams({
                "title": toast.title,
                "message": toast.message,
                "duration": toast.duration,
                "type": toast.type
            });
            toastEvent.fire();
        } else {
            var techCToast = cmp.find('TechCToast');
            if(techCToast){
                techCToast.set('v.toast',toast);
                
            }else{
                cmp.set('v.toast',toast);
            }
        }
    },

})