({
	doInit : function(cmp, evt, hlpr){
		hlpr.doInit(cmp)
	},
    showDetails : function(cmp, evt, hlpr){
        hlpr.showDetails(cmp, evt);
    },
    handleSelectAll : function(cmp, evt, hlpr){
        hlpr.handleSelectAll(cmp);
    },
    handleSelect : function(cmp, evt, hlpr){
        hlpr.maintainSelectAll(cmp, evt.currentTarget.checked);
    },
    handleNew : function(cmp, evt, hlpr){
        hlpr.createRecord(cmp);
    },
    handleDelete : function(cmp, evt, hlpr){
        hlpr.deleteRecord(cmp, evt);
    },
    handleEdit : function(cmp, evt, hlpr){
        hlpr.editRecord(cmp, evt);
    },
    handleTechcAccountDML : function(cmp, evt, hlpr){
        var data = evt.getParam('data');
        if(data){
            if(data.source==='insert'){
                hlpr.refreshList(cmp, data.rec);
            }else if(data.source==='delete'){
                hlpr.updateList(cmp, data.recId);
            }else if(data.source==='edit'){
                hlpr.updateListRecord(cmp, data.rec);
            }
            else if(data.source==='updateSource'){
                hlpr.updateAccountSource(cmp, data.accSource);
            }
        }
    },
    handleUpdateSource : function(cmp, evt, hlpr){
        hlpr.handleUpdateSource(cmp);
    },
    handleMassDelete : function(cmp, evt, hlpr){
        hlpr.handleMassDelete(cmp);
    },
    handleMassDeleteConfirm : function(cmp, evt, hlpr){
        hlpr.handleMassDeleteConfirm(cmp);
    },
    handleCloseModal : function(cmp, evt, hlpr){
        cmp.set('v.isMassDelete', false);
    }
})