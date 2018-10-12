({
	handleLoad : function(cmp) {
        var data = cmp.get('v.data');
        if(data.refresh === "true"){
            data.refresh = false;
            if(data.hide === "true"){
                cmp.set('v.rec', {});
            }else{
                cmp.set('v.recId', data.id);
                cmp.set('v.rec', data);
            }
            cmp.set('v.data', data);
        }
	}
})