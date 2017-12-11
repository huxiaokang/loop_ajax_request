
var currentTime = 1;
var allLength = $("#historyInfo tbody").find(".refresh").length;
dealRefreshAll(currentTime, allLength, _this, $("#historyInfo tbody"));

function dealRefreshAll(currentTime,allLength,searchObj,dataObj){
	if(currentTime > allLength){
		searchObj.attr('data-operator',"true");
		return;
	}
	var index = currentTime-1;
	var _this = dataObj.find(".refresh").eq(index);
	var goodsId = _this.parent("td").attr("data-attr");
	var data = {goodsId:goodsId};
	$.ajax({
	    type:"GET",
	    url:url,
    	data:data,
    	dateType:"json",
    	success:function(data){
    			var optInfo = data.data;
    			if(data.code == 0){
	    			var flag = optInfo.isOneRefresh;
					if(flag){
						initData();
					}else{
						var tdHtml = loadTdHtml(optInfo);
			            $("#historyInfo tbody").find("tr").eq(index).html(tdHtml);
					}
    		
    		currentTime++;
    		dealRefreshAll(currentTime, allLength, searchObj, dataObj);
    	},
    	error:function(data){
    		currentTime++;
    		dealRefreshAll(currentTime, allLength, searchObj, dataObj);
    	}
    });
}
