// $(document).ready(function () {
//     console.log('here4)')
// })
$('#auth').submit(function (e) {
    e.preventDefault()
    let login = $('[name="login"]').val();
    let pass = $('[name="pass"]').val();
    const credentials = btoa(`${login}:${pass}`)
    console.log(credentials)

    doAjaxQuery('GET', '/admin/api/v1/login', null, cbAuth, credentials)
    // $.ajax({
    //     type: 'GET',
    //     url: '/admin/api/v1/login',
    //     contentType: 'application/json',
    //     dataType: 'json',
    //     data: null,
    //     headers: {
    //         'Authorization': `Basic ${credentials}`
    //     },
    //     success: function (res) {
    //         console.log('ajaxSuccess')
    //
    //         window.location = '/admin'
    //     },
    //     error: function (jqXHR, textStatus, res) {
    //         console.log('inAjaxError', textStatus)
    //         view.showError('Неверный логин или пароль');
    //         // view.showError('Ошибка ' + textStatus);
    //     }
    // });
})

function cbAuth(res){
    window.location.href = '/admin'
}
