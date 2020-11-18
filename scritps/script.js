const validation = {
    email_regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    is_email: (email) => {
        return validation.email_regex.test(email)
    }
}

const mailer = {
    template_id: 'template_i483syh',
    service_id: 'service_zw9xaep',
    user_id: 'user_ThqM6BzDlNZpWeXK0rj7S',

    init: () => {
        emailjs.init(mailer.user_id);
    },

    sendMail: (from_name_value, subject_value, message_value, reply_to_value) => {
        if(mailer.validateInput(from_name_value, subject_value, message_value, reply_to_value)){
            emailjs.send(
                mailer.service_id,
                mailer.template_id,
                {
                    from_name: from_name_value,
                    subject: subject_value,
                    message: message_value,
                    reply_to: reply_to_value
                }
            ).then(
                (response) => {
                    form.success();
                },
                (error) => {
                    form.fail(error);
                }
            )
        }
    },
    
    validateInput: (from_name_value, subject_value, message_value, reply_to_value) => {
        let valid = true;

        if(!from_name_value) {
            form.show_error('empty-from');
            valid = false;
        }

        if(!subject_value) {
            form.show_error('empty-subject');
            valid = false;
        }

        if(!message_value) {
            form.show_error('empty-message');
            valid = false;
        }

        if(!reply_to_value) {
            form.show_error('empty-reply-to');
            valid = false;
        } else if(!validation.is_email(reply_to_value)){
            form.show_error('invalid-reply-to');
            valid = false;
        }

        return valid;
    }
};

form = {
    success: () => {
        let button = document.getElementById('contact-form-submit');
        button.innerHTML = '<i class="fa fa-check"></i> Sent';

        form.hide_all_errors();
    },

    fail: error => {
        alert(error.message);
    },

    hide_all_errors: () => {
        ['empty-from', 'empty-reply-to', 'empty-subject', 'empty-message', 'invalid-reply-to'].forEach(element => {
            document.getElementById(element).hidden = true;
        })
    },

    show_error: element => {
        document.getElementById(element).hidden = false;
    }
}

listeners = {
    add_listener: (element, event, callback) => {
        element.addEventListener(event, callback);
    },

    contact_submit: event => {
        const from_name = document.getElementById('from_name').value;
        const subject_value = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const reply_to = document.getElementById('reply_to').value;

        mailer.sendMail(from_name, subject_value, message, reply_to);
    }
};

const onLoad = () => {
    mailer.init();
    listeners.add_listener(document.getElementById('contact-form'), 'submit', listeners.contact_submit);
};

onload = onLoad;