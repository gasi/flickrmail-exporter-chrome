var bp = chrome.extension.getBackgroundPage();
function log(message) {
    bp.console.log(message);
}

var LAST_PAGE = 11;
var BASE_URL = 'http://www.flickr.com';
var messages = [];

for (var i = 1; i <= LAST_PAGE; i++) {

    var page = '/page' + i

    $.get(BASE_URL + '/mail/sent' + page, function(data) {
        var urls = [];

        $(data).find('.message_row.sent .subj a').each(function(i) {
            urls.push(BASE_URL + $(this).attr('href'));
        });

        urls.forEach(function(url) {
           $.get(url, function(data) {
                var to = $(data).find('p.flickrmail-to .username').text().trim();
                var subject = $(data).find('div.ThinCase > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
                var body = $(data).find('div.ThinCase > table > tbody > tr:nth-child(3)').text().trim();

                messages.push({
                    to: to,
                    subject: subject,
                    body: body
                });


                log('To: ' + to + '\n' +
                    'Subject: ' + subject + '\n\n' +
                    body);
            });
        });
    });
}
