var pathname = $(location).attr('pathname');
var bookIdPosition = pathname.lastIndexOf('/') + 1;
// var isBookInUse = true;
var bookId = pathname.substr(bookIdPosition);

console.log(bookId)
// doAjaxQuery('GET', '/api/v1/books/' + bookId, null, function(res) {
//     view.fillBookInfo(res.data);
//     if (res.data.event) {
//         isBookInUse = true;
//         bookId = res.data.id;
//     }
// });

/* --------------------Show the result, for sending the -----------------------
----------------------email in the queue for the book ---------------------- */
// var showResultSendEmailToQueue = function(email, result) {
//     var busy = $('#bookID').attr('busy');
//     $('.form-queue', '.btnBookID', (busy === null) ? '.freeBook' : '.busyBook').css('display', 'none');
//     $('.response').css('display', 'block');
//     $('span.youEmail').text(' ' + email);
// };

/*--------------- Send email. Get in Queue in for a book ---------------------*/
// var sendEmailToQueue = function(id, email) {
//     doAjaxQuery('POST', '/api/v1/books/order', {'email': email, 'id': id},
//         function(res) {
//         showResultSendEmailToQueue(email, res.success);
//     });
// };

/* --------------- Checking validity of email when typing in input -----------*/
// $('.sweet-alert fieldset input').keydown(function(event) {
//     console.log('in fieldset input')
//     var email = $(this).val();
//     var isEmail = controller.validateEmail(email);
//     if (email === '') {
//         $('.input-group').removeClass('has-error has-success');
//         view.hideElement('.glyphicon-remove', '.glyphicon-ok');
//     } else {
//         if (isEmail) {
//             view.showSuccessEmail();
//             if (event.keyCode == 13) {
//
//                 var id = $('#id').attr('book-id');
//                 sendEmailToQueue(id, email);
//             }
//         } else {
//             view.showErrEmail();
//         }
//     }
// });
/*------------------ Sending email by clicking on the button ----------------*/
$('.btnBookID').click(function(event) {
    let isBookInUse = +$('#id').attr('busy');
    view.incWant(bookId)

    // var email = $('.orderEmail').val();
    // var isEmail = controller.validateEmail(email);
    // console.log('email', email)
    // if (isEmail) {
    //     view.showSuccessEmail();
    //     var id = $('#bookID').attr('book-id');
    //     sendEmailToQueue(id, email);
    // } else {
    //     view.showErrEmail();
    // }
    if (isBookInUse) {
        view.showSubscribe(
            "Сейчас эта книга находится на руках, у одного из наших учеников." +
            " Оставь свой email и мы сообщим, как только книга вновь" +
            " появится в библиотеке", bookId);
        // console.log($('.sweet-alert fieldset input'))
    } else {
        view.showSuccess("Книга свободна и ты можешь прийти за ней." +
            " Наш адрес: г. Кропивницкий, переулок Васильевский 10, 5 этаж." +
            " Лучше предварительно прозвонить и предупредить нас, чтоб " +
            "не попасть в неловкую ситуацию. Тел. 099 196 24 69"+
            " \n\n")
    }
});
