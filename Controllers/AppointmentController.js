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
    fetch : function (){
        var userModel = JSON.parse(xit.storage.getValue('loggedInUser'))
        var filterModel = null
        if(userModel.roleId == 1){ 
            filterModel = {
                statusCode:1 
            }
        } else {
            filterModel = {
                patientId:userModel.id 
            } 
        }
        $('#tAppointments').append(xit.ui.processPlaceHolder)
        var headers = ['Authorization: Bearer ' + userModel.token]
        xit.request.get(headers, filterModel, endpoints.appointment.fetch).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                AppointmentController.displayLV(response.data)
            }else { 
                Observer.displayErrors(response)
            }
            $("#tAppointments").find('img').each(function() {$(this).remove()})
        }).catch(function (error){
            alert(error)
            $("#tAppointments").find('img').each(function() {$(this).remove()})
        })
    },
    displayLV :function (appointmentModels){
        var htmlContent = ''
        appointmentModels.forEach(appointmentModel => {
            htmlContent += '<tr id="' + appointmentModel.id + '" style="cursor: pointer;" onclick="AppointmentController.openAppointment(this)">'
            htmlContent += '<td>' + appointmentModel.id + '</td>'
            htmlContent += '<td>' + appointmentModel.dateTime + '</td>'
            htmlContent += '<td>' + appointmentModel.description + '</td>'
            htmlContent += '<td>' + appointmentModel.createdOn + '</td>'
            htmlContent += '<td>' + appointmentModel.statusName + '</td>'
            htmlContent += '</tr>'
        })
        $('#tbAppointments').html(htmlContent)
    },
    openAppointment : function (view){
        xit.request.get(null, {id: $(view).attr('id')}, endpoints.appointment.view).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                xit.storage.saveItem('appointmentModel', JSON.stringify(response.data))
                var userModel = JSON.parse(xit.storage.getValue('loggedInUser'))
                if(userModel.roleId == 1){ 
                    xit.ui.openmodal('GET', null, null, 'Views/Visit/NewVisit.html', '#modalL', true)
                } else {
                    xit.ui.openmodal('GET', null, null, 'Views/Appointment/AppointmentInfo.html', '#modalL', true)
                }
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    }
}