PaymentController = {
    create : function (view, visitModel){
        console.log(visitModel)
        $(view).text('Loading...')
        xit.request.post(['Authorization:Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token], visitModel, endpoints.visit.create).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                $('#spVisits').html((parseInt($('#spVisits').html()))+1)
                $('#modalL').modal('hide')
            }else {
                Observer.displayErrors(response)
            }
            $(view).text('Save')
        }).catch(function (error){
            $(view).text('Save')
            alert(error)
        })
    },
    fetch : function (filterModel){
        $('#tVisits').append(xit.ui.processPlaceHolder)
        var headers = ['Authorization: Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token]
        xit.request.get(headers, filterModel, endpoints.visit.fetch).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                $("#tVisits").find('img').each(function() {$(this).remove()})
                VisitController.displayLV(response.data)
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    },
    displayLV :function (visitModels){
        var htmlContent = ''
        visitModels.forEach(visitModel => {
            htmlContent += '<tr id="' + visitModel.id + '" style="cursor: pointer;" onclick="VisitController.open(this)">'
            htmlContent += '<td>' + visitModel.id + '</td>'
            htmlContent += '<td>' + visitModel.diagnosis + '</td>'
            htmlContent += '<td>' + visitModel.prescriptions + '</td>'
            htmlContent += '<td>' + visitModel.createdOn + '</td>'
            htmlContent += '<td>' + visitModel.statusName + '</td>'
            htmlContent += '</tr>'
        })
        $('#tbVisits').html(htmlContent)
    }
}