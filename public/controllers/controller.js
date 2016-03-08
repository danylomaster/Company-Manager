//var app = angular.module('cmApp',[]);
  angular.module("CompanyManagerApp", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope, $http){

        $http.get("/companies").success(function(responce){
            $scope.treeData = new kendo.data.HierarchicalDataSource({data : responce});
        });


	  function count(obj){ 
var sum =0;
//debugger;
for (var key in obj){
if(key=="earnings") sum+=parseFloat(obj[key]);
if(key=="items"){
var z=obj[key].length;
for(var i=0; i<z;i++){
sum+=count(obj[key][i]);
}
} 
}
return parseFloat(sum);
};


          function treeToJson(nodes) {

    return $.map(nodes, function(n, i) {
    
        var result = { title: n.title, earnings: n.earnings};
    
        if (n.hasChildren)
            result.items = treeToJson(n.children.view());

        return result;
    });
}

          
           $scope.applyChanges = function() {
            var json = treeToJson($scope.treeData.view()); 
            $http.put("/companies",json);

          };

          $scope.click = function(dataItem) {
			alert("Total earnings of displayed companies tree: "+count(dataItem));
          };

          function makeItem() {
            var txt = $scope.newItem.title;
            var val = parseFloat($scope.newItem.earnings);
            return { title: txt, earnings:val };
          };
          $scope.addAfter = function(item) {
            var array = item.parent();
            var index = array.indexOf(item);
            var newItem = makeItem();
            array.splice(index + 1, 0, newItem);
            $scope.newItem.title="";
            $scope.newItem.earnings="";
          };

          $scope.addBelow = function() {
            var newItem = makeItem();
            $scope.tree.append(newItem, $scope.tree.select());
              $scope.newItem.title="";
            $scope.newItem.earnings="";
          };

          $scope.remove = function(item) {
            var array = item.parent();
            var index = array.indexOf(item);
            array.splice(index, 1);
          };
      //--
      $scope.update = function(item) {
            var array = $scope.tree;
            var index = array.indexOf(item);
            array[index].title=$scope.selectedItem.title;
          };
      //--
      $scope.testBtn = function() {
            alert($scope.inpTest);
          };
      function makeNewItem(text,value){
          return {title:text,earnings:value};
      }
      $scope.addData = function(item) {
          var array = item.parent();
            var index = array.indexOf(item);
            var newItem = makeNewItem("test2",55);
            array.splice(index + 1, 0, newItem);
          };
      
       })