NavBarController = {
    getNavBar : function (navItems, ulId){
        xit.files.readJsonFile(navItems).then(function (content){
            var htmlContent = ''
            content.forEach(navItemModel => {
                htmlContent += '<li class="has-sub">'
                    htmlContent += '<a href="#"> <i class="fas fa-' + navItemModel.icon + '"></i>' + navItemModel.label + '<span class="bot-line"></span> </a>'
                    htmlContent += '<ul class="header3-sub-list list-unstyled">'
                        navItemModel.subs.forEach(navSubItemModel => {
                            htmlContent += '<li> <a href="#' + navSubItemModel.selector + '" view="' + navSubItemModel.view + '" onclick="navClick(this, null)">' + navSubItemModel.label + '</a> </li>'
                        })
                    htmlContent += '</ul>'
                htmlContent += '</li>'
            })
            $(ulId).append(htmlContent)
        }).catch(function (error){
            alert(error)
        })
    }
}