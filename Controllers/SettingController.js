SettingController = {
    createVideo : function (view, makeModel){
        $(view).text('Saving...')
        xit.request.post(['Authorization:Bearer ' + JSON.parse(xit.storage.getValue('loggedInUser')).token], makeModel, endpoints.video.create).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                alert('fsh')
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
        $(view).text('Save')

    },
    fetchVideos : function (filterModel){
        $('#tVideos').append(xit.ui.processPlaceHolder)
        xit.request.get(null, filterModel, endpoints.video.fetch).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                $("#tVideos").find('img').each(function() {$(this).remove()})
                SettingController.displayVideosLV(response.data)
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    },
    displayVideosLV :function (videoModels){
        var htmlContent = ''
        videoModels.forEach(videoModel => {
            htmlContent += '<tr id="' + videoModel.id + '" style="cursor: pointer;" onclick="SettingController.openVideo(this)">'
            htmlContent += '<td>' + videoModel.id + '</td>'
            htmlContent += '<td>' + videoModel.title + '</td>'
            htmlContent += '<td>' + videoModel.description + '</td>'
            htmlContent += '<td>' + videoModel.createdOn + '</td>'
            htmlContent += '<td>' + videoModel.statusName + '</td>'
            htmlContent += '</tr>'
        })
        $('#tbVideos').html(htmlContent)
    },
    openVideo : function (view){
        xit.request.get(null, {id: $(view).attr('id')}, endpoints.video.view).then(function (response){
            response = JSON.parse(response)
            if(response.status_code == 1){
                xit.storage.saveItem('videoModel', JSON.stringify(response.data))
                xit.ui.openmodal('GET', null, null, 'Views/Video/VideoInfo.html', '#modalL', true)
            }else { 
                Observer.displayErrors(response)
            }
        }).catch(function (error){
            alert(error)
        })
    }
}