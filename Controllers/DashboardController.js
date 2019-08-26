DashboardController = {
    stats : function (){
        xit.request.get(['Authorization:Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token], null, endpoints.analytics.stats).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                xit.storage.saveItem('sysStats', JSON.stringify(response.data))
                $('#spAppointments').html(response.data.appointmentsCount)
                $('#spVisits').html(response.data.visitsCount)
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    }
}