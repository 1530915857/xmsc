var head=angular.module("head",["ui.router"]);
head.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when("","/mainlist");
	$stateProvider
	.state("main",{
		url:"",
		templateUrl:"./html/main.html"
	})
	.state("main.mainlist",{
		url:"/mainlist",
		templateUrl:"./html/mainlist.html",
		controller:"mainlist"
	})
	.state("main.details",{//商品详情
		url:"/details",
		templateUrl:"./html/details.html",
		controller:"details"
	})
	.state("main.search",{//搜索
		url:"/search",
		templateUrl:"./html/search.html",
		controller:"search"
	})
	.state("main.searchlist",{//搜索列表
		url:"/searchlist",
		templateUrl:"./html/searchlist.html",
		controller:"searchlist"
	})
}]);
head.controller("body",["$scope","$rootScope","$http","$location",function($scope,$rootScope,$http,$location){
	$rootScope.page={};
	$rootScope.page.hashead=true;
	$rootScope.page.hasfoot=true;
	$rootScope.page.title="小米商城-小米官方网站，小米手机，红米手机正品专卖";
	$scope.getId=function(item){
		$location.path("/details");
		$rootScope.id=item;
	}
	$rootScope.page.goPage = function(txt){
		$location.path("/"+txt);
	}
	$rootScope.page.hback=function()//返回上一页
	{
		 history.go(-1);
	}
}])
head.controller("mainlist",["$scope","$rootScope","$http","$location",function($scope,$rootScope,$http,$location){
	$rootScope.page.hashead=true;
	$rootScope.page.left=true;
	$rootScope.page.center=true;
	$rootScope.page.right=true;
	$rootScope.page.hasfoot=true;
	$rootScope.page.indexfoot=true;
	$rootScope.page.detailsfoot=false;
	$rootScope.page.homepage=false;
	$rootScope.page.searchlist=false;
	$rootScope.page.back=false;
	$rootScope.page.share=false;
	$rootScope.page.search=false;
//	$scope.getId=function(item){
//		$location.path("/details");
//		$rootScope.id=item;
//	}
}])
head.controller("roll",["$scope","$http","$timeout",function($scope,$http,$timeout){
	$http.get("./public/json/indexroll.json").success(function(data){
//		console.log(data);
		$scope.roll=data;
	})
	$timeout(function(){
		var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		autoplay:3000,
		autoplayDisableOnInteraction:false,
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 30,
		loop: true
	    });
	},0)
}]);
head.controller("mxdp",["$scope","$http",function($scope,$http){
	$http.get("./public/json/mxdp.json").success(function(data){
		$scope.mxdp=data;
	})
}]);
head.controller("details",["$scope","$rootScope","$http","$location","$timeout",function($scope,$rootScope,$http,$location,$timeout){
	$rootScope.page.hashead=true;
	$rootScope.page.left=false;
	$rootScope.page.center=false;
	$rootScope.page.right=false;
	$rootScope.page.hasfoot=true;
	$rootScope.page.indexfoot=false;
	$rootScope.page.detailsfoot=true;
	$rootScope.page.searchlist=false;
	$rootScope.page.back=true;
	$rootScope.page.share=true;
	$rootScope.page.show=true;
	$rootScope.page.search=false;
	$rootScope.page.showBigphone=function()
	{
		$rootScope.page.bigPhone=true;
		$rootScope.page.show=false;
	}
	var goodsid=$rootScope.id;
	$http.get("./public/json/indexroll.json").success(function(data){
		for (var i in data)
		{
			if(goodsid==data[i]["id"])
			{
				$scope.LIST=data[i];
				$scope.list=data[i]["roll"];
				$scope.detailphot=data[i]["detailphoto"];
				$rootScope.page.title=data[i]["title"]+"_小米商城";
				break;
			}
		}
	});
	 $timeout(function(){
		var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		autoplay:3000,
		autoplayDisableOnInteraction:false,
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 30,
		loop: true
	    });
	},10);	
}]);
head.controller("search",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
	$rootScope.page.hashead=true;
	$rootScope.page.hasfoot=false;
	$rootScope.page.left=false;
	$rootScope.page.center=false;
	$rootScope.page.right=false;
	$rootScope.page.back=false;
	$rootScope.page.share=false;
	$rootScope.page.search=true;
	$rootScope.page.searchlist=false;
	$rootScope.page.getval=function()
	{
	    $rootScope.inVal=$scope.page.getSeval; 
        $rootScope.page.goPage('searchlist');
	};
}]);
head.controller("searchlist",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
	$rootScope.page.hashead=true;
	$rootScope.page.hasfoot=false;
	$rootScope.page.left=false;
	$rootScope.page.center=false;
	$rootScope.page.right=false;
	$rootScope.page.back=false;
	$rootScope.page.share=false;
	$rootScope.page.searchlist=true;
	$rootScope.page.ending='"'+$rootScope.inVal+'"';
	$rootScope.page.search=false;
}])
head.controller("endlist",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
	$http.get("./public/json/mxdp.json").success(function(data){
		console.log(data);
		var list = [];
		for (var i in data)
		{
			if (data[i]["name"].indexOf($rootScope.inVal)!=-1)
			{
				list.push(data[i]);
			}
		}
		console.log(list);
        $scope.endlist = list;
	});
}]);