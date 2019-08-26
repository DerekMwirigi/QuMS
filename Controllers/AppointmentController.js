AppointmentController = {
    create : function (view, appointmentModel){
        console.log(appointmentModel)
        $(view).text('Loading...')
        xit.request.post(['Authorization:Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token], appointmentModel, endpoints.appointment.create).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                $('#spAppointments').html((parseInt($('#spAppointments').html()))+1)
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
        $('#tAppointments').append(xit.ui.processPlaceHolder)
        var headers = ['Authorization: Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token]
        xit.request.get(headers, filterModel, endpoints.appointment.fetch).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                $("#tAppointments").find('img').each(function() {$(this).remove()})
                AppointmentController.displayLV(response.data)
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    },
    displayLV :function (appointmentModels){
        var htmlContent = ''
        appointmentModels.forEach(appointmentModel => {
            htmlContent += '<tr id="' + appointmentModel.id + '" style="cursor: pointer;" onclick="AppointmentController.open(this)">'
            htmlContent += '<td>' + appointmentModel.id + '</td>'
            htmlContent += '<td>' + appointmentModel.dateTime + '</td>'
            htmlContent += '<td>' + appointmentModel.description + '</td>'
            htmlContent += '<td>' + appointmentModel.createdOn + '</td>'
            htmlContent += '<td>' + appointmentModel.statusName + '</td>'
            htmlContent += '</tr>'
        })
        $('#tbAppointments').html(htmlContent)
    }
}