(function ($) {

    
    $.fn.listFilters = function(options) {

        var filters = this;
        var fil = "";
        var hs = "";
        var settings = {
            listid: "#filtered-list",
            filterOperator: "AND",
            paginationHolder: "div.pagination-holder",
            paginationContainerId: "list",
            activeTagClass: "active",
            modelNoPagination: true
        };

        if (options) {
            $.extend(settings, options);
        }

        performFiltering();
        
        //set up hash chnage detection 
        $(window).bind('hashchange', function (e) {
            performFiltering();
        });
        
         $("a.tag_alt").click(function(){
        	 var currentActiveFilterClass = $(this).attr("class").split(' ')[1];
        	 $("a.tag."+currentActiveFilterClass).click();
        });
        
        return filters.click(function () {
            
            if ($(this).hasClass(settings.activeTagClass)) {
                $(this).removeClass(settings.activeTagClass);
            } else {
                $(this).addClass(settings.activeTagClass);
            }
            createFilter();
        });
        
        function performFiltering() {

	            activateTagsByHashUrl();
	            createFilter();
	            performFilter();
	            performPagination();   
        }
        
        function activateTagsByHashUrl() {
            
            var hashUrl = document.URL.substr(document.URL.indexOf('#') + 1);
            var tagsSplited = hashUrl.split("&");
            $.each(tagsSplited, function(key, tag) {
                var tagValue = tag.split("=")[1];
                filters.each(function () {
                    if ($(this).hasClass(tagValue)) {
                        $(this).removeClass(settings.activeTagClass).addClass(settings.activeTagClass);
                    }
                });
            });
        }

        function createFilter() {
            hs = "";
            fil = "";
            $(filters).each(function () {

                if ($(this).hasClass(settings.activeTagClass)) {

                    if (hs.length > 0) {
                        hs = hs + "&";
                    }

                    var currentActiveFilterClass = $(this).attr("class").split(' ')[1];
                    fil = fil + "." + currentActiveFilterClass;
                    hs = hs + "tag=" + currentActiveFilterClass;
                }
            });
            
            location.hash = "#" + hs;
        }

        function performFilter() {
            $(settings.listid + " li")
                .removeClass("not-filtered")
                .removeClass("filtered")
                .addClass("not-filtered");
				
				$(filters).show();
				
                if(settings.modelNoPagination){
                	 $(settings.listid + " li.not-filtered").show();
                }
                

            if (fil.length > 0) {
                $(settings.listid + " li" + fil).removeClass("not-filtered").addClass("filtered");
                
              /*hide filters without current*/  
              $(filters).each(function(){
              	if(!$(this).hasClass(settings.activeTagClass)){
              		$(this).hide();
              	}
              });  
              
              /*Show other tags depend on results*/  
              $(settings.listid + " li.filtered").each(function(){

              	var classList = $(this).attr("class").split(/\s+/);
				for (var i = 0; i < classList.length; i++) {
					$("ul.tags a."+classList[i]).show();
				}
              	
              });
              	
              
                
            } else {
                $(settings.listid + " li")
                    .removeClass("not-filtered")
                    .removeClass("filtered");
            }

             if(settings.modelNoPagination){
              	 $(settings.listid + " li.not-filtered").hide();
             }
              
              
  
 
                
        }

        function performPagination() {
            try {
                destroyPagination();
            } catch(e) {
               // alert(e.message);
            }
            //alert("OK");
                
            $(settings.paginationHolder).jPages({
                containerID: settings.paginationContainerId,
                perPage: 10
            });
        }

        function destroyPagination() {
            $(settings.paginationHolder).jPages("destroy");
        }
    };
    
    
}(jQuery));