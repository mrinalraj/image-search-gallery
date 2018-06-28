$('#form').on('submit', e => {
    e.preventDefault()
    let resultDiv = $('#results .row')
    resultDiv.html('')
    let load = document.createElement('h2')
    $(load).html('Loading....')
    resultDiv.append(load)
    $.get('/api/images', $('#form').serialize())
        .then(data => {
            load.hidden = true
            if (data.error) return resultDiv.append(`<h2>Some error occured<br>${data.error.msg}</h2>`)
            let urls = data.urls
            urls.forEach(url => {
                let d = document.createElement('div'),
                    img = document.createElement('img')
                $(img).addClass('img-fluid img-thumbnail').attr('src', url).appendTo(d)
                $(d).addClass('col-sm-4').appendTo(resultDiv)
            })

        })
})