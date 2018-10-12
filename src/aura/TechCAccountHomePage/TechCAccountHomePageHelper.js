({
    doInit : function(cmp) {
        document.title="TECH CHALLANGE - Capgemini";
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        
        $A.util.removeClass(cmp.find('homeSpinner'), 'slds-hide');
        var action = cmp.get("c.getInitData");
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.util.addClass(cmp.find('homeSpinner'), 'slds-hide');
            if (state === "SUCCESS") {
                var accList =[];
                var accs = response.getReturnValue();
                accs.forEach(function(acc){
                    acc['isSelected'] = false;
                    accList.push(acc);
                })
                cmp.set('v.accList', accList);
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
    showDetails : function(cmp, evt){
        var target = evt.currentTarget;
        var data = target.dataset;
        data['refresh'] = true; 
        var accDetails = cmp.find('accDetails');
        if(accDetails){
            var oldData = accDetails.get('v.data');
            data.hide = false;
            if(oldData){
                data.hide = oldData.id ===data.id;
                accDetails.set('v.data',data);
            }else if(!oldData){
                accDetails.set('v.data',data);
            }
        }
    },
    handleSelectAll : function(cmp){
        var chkSelectAll = cmp.find('chkSelectAll');
        if(chkSelectAll){
            var isChecked = chkSelectAll.get('v.checked');
            var accList = cmp.get('v.accList');
            accList.forEach(function(acc){
                acc.isSelected = isChecked
            })
            cmp.set('v.accList', accList);
        }
    },
    maintainSelectAll : function(cmp){
        var chkSelectAll = cmp.find('chkSelectAll');
        if(chkSelectAll){
            var selectAllChecked = chkSelectAll.get('v.checked');
            var accList = cmp.get('v.accList');
            var selectAll = true;
            for(var ind=0, len=accList.length; ind<len; ind++){
                if(accList[ind].isSelected == false){
                    selectAll = false;
                    break;
                }
            }
            if(selectAll !== selectAllChecked){
                chkSelectAll.set('v.checked',selectAll);
            }
        }
    },
    createRecord : function (cmp) {
        cmp.set('v.isCreate', true);
    },
    editRecord : function(cmp, evt){
        var target = evt.currentTarget;
        var accId = target.getAttribute('id');
        cmp.set('v.isEdit', true);
        cmp.find('accEdit').set('v.recId',accId);        
    },
    deleteRecord : function(cmp, evt){
        var target = evt.currentTarget;
        var accId = target.getAttribute('id');
        cmp.set('v.isDelete', true);
        cmp.find('accDeletion').set('v.recId',accId);        
    },
    refreshList : function(cmp, recs){
        var accList = cmp.get('v.accList');
        accList = accList.concat(recs);
        accList.sort(function(a,b){
            return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
        })
        cmp.set('v.accList',accList);
    },
    updateList : function(cmp, recId){
        var accList = cmp.get('v.accList');
        for(var ind =0, len = accList.length; ind<len;ind++){
            var acc = accList[ind];
            if(acc.Id ===recId){
                console.log(acc);
                accList.splice(ind,1);
                break;
            }
        }
        cmp.set('v.accList',accList);
    },
    updateListRecord : function(cmp, rec){
        var accList = cmp.get('v.accList');
        for(var ind =0, len = accList.length; ind<len;ind++){
            var acc = accList[ind];
            if(acc.Id ===rec.Id){
                accList[ind] = rec;
                break;
            }
        }
        accList.sort(function(a,b){
            return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
        })
        cmp.set('v.accList',accList);
    },
    handleUpdateSource : function(cmp){
        var selectedIds = [];
        var accList = cmp.get('v.accList');
        accList.forEach(function(acc){
            if(acc.isSelected){
                selectedIds.push(acc.Id);
            }
        })
        if(selectedIds.length > 0){
            cmp.set('v.isUpdateAccountSource', true)
        }else{
            this._showToast(cmp,{title:'Update Account Source',
                                 message:'Please select records!',
                                 type:'error'})
        }
    },
    updateAccountSource : function(cmp, accSource){
        var selectedIds = [];
        var accList = cmp.get('v.accList');
        accList.forEach(function(acc){
            if(acc.isSelected){
                selectedIds.push(acc.Id);
                acc.AccountSource = accSource;
                acc.isSelected = false;
            }
        })
        if(selectedIds.length > 0){
            this.updateAccountsSource(cmp, selectedIds, accSource, accList);
        }
    },
    updateAccountsSource : function(cmp, selectedIds, accSource, accList){
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        
        $A.util.removeClass(cmp.find('homeSpinner'), 'slds-hide');
        var action = cmp.get("c.setAccountSource");
        action.setParams({accIds:selectedIds, accSource:accSource});
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            $A.util.addClass(cmp.find('homeSpinner'), 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                this._showToast(cmp,{title:'Update Account Source',
                                     message:'Records updated Successfully!',
                                     type:'success'})
                cmp.set('v.accList', accList);
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
    handleMassDelete: function(cmp){
        var selectedIds = [];
        var accList = cmp.get('v.accList');
        accList.forEach(function(acc){
            if(acc.isSelected){
                selectedIds.push(acc.Id);
            }
        })
        if(selectedIds.length > 0){
            cmp.set('v.isMassDelete', true)
        }else{
            this._showToast(cmp, {title:'Update Delete!',
                                 message:'Please select records!',
                                 type:'error'});
        }
    },
    handleMassDeleteConfirm: function(cmp){
        var selectedIds = [];
        var accList = cmp.get('v.accList');
        var newAccList = []
        accList.forEach(function(acc){
            if(acc.isSelected){
                selectedIds.push(acc.Id);
            }else{
                newAccList.push(acc);
            }
        })
        if(selectedIds.length > 0){
            this.deleteAccounts(cmp, selectedIds, newAccList);
        }
    },
    deleteAccounts : function(cmp, selectedIds, accList){
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        
        $A.util.removeClass(cmp.find('homeSpinner'), 'slds-hide');
        
        var action = cmp.get("c.deleteAccount");
        action.setParams({accIds:selectedIds});
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.util.addClass(cmp.find('homeSpinner'), 'slds-hide');
            cmp.set('v.isMassDelete', false);
            if (state === "SUCCESS") {
                this._showToast(cmp,{title:'Update Delete',
                                     message:'Records deleted Successfully!',
                                     type:'success'})
                cmp.set('v.accList', accList);
                
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
    
    _showToast: function(cmp, toast) {
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
    }
})