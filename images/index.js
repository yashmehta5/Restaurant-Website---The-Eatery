'use strict';

// Import the Dialogflow module from Google client libraries.
const functions = require('firebase-functions');
const { google } = require('googleapis');
const { WebhookClient } = require('dialogflow-fulfillment');

// Enter your calendar ID below and service account JSON below
const calendarId = "j8b1cu154mu6n9smu9tealmabk@group.calendar.google.com";
const serviceAccount = {
    "type": "service_account",
    "project_id": "datalkbot-pkyl",
    "private_key_id": "e1bce79333b4c08cb76851b51a4bd0e8635e3c36",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXrXAW0AJ0FvMr\nDxCBAe3wlRb3MPtTocul+2NXkUKAneqZDxQDom+7Irv1U02k5997F4E6SMUrBQ/k\njXVij1Q+0bEy17LSVZCX2yI2Tp/zLHc06b+8zm8iBAfX/zvnJaMpfpE2ICsJt13m\n6g7IvuWh3wbNa6pAc0oIp0LPRKk3c0HMRaBijEWewD7D6dHG8qufjOCKqZtmSBsq\ntQXBE8Qf+3fitvJbKBaMUlAFzeJP01/lFdadMR5hLathqWFPGg8RNy9OdsH2Dpt4\nK/jT1CMDvsMy7fr70LBAYM3813CZLfsSriY1svC1V1YqqEB2ougcH3msZyAy4iYQ\nghZ8fY1dAgMBAAECggEAR7N5paPehPCSQ9jcwD6/dzFhcqlejGWoGdSyqIx6ot6c\n/Oh122V3pqt7+CmLEQ0jDz13sUQ7BDvJFk7u3ObQd5fnxILQCLv4d3ua6poF8+Zu\n9PDW1PJ+IL1dTDImnIg3L5bLuMZF+JN0zM04QAWyurc2ADnQXl/Vl33fqJ9ncC6t\nIDKByZf58RmKtNwV86KVogxTPywvY8lSh+xy1G6O1PpsSNHLPWx1XSztOGEpCmab\nrjdfEjnofYUb2nM48KuWxhWD/HgnRUPzkZ8fkvWsIeyZZIhyjW2pzPhQof3cGJWl\n/SwApRwRXOYwhdoIpmXHzus2rRJKuusz7XDE53M10wKBgQD2rIu5U+JwnjAMj8uR\nfEraCBAgFDB1Mgw0d7JTlxgR8DOM0UkvbjPG1deiPRVxcWrSAR5w0mxJBmqyhiwM\n/iVDYA8O4lx2qcdEBmvjWC22ZmJDhk3XPZ4y4iz8JF05rSO8H99MKkawNbhZTg6I\nGyBDHe4Obd/xYeNltO9hQA66UwKBgQDf1OPI/PuOyL7qcshYIqcZTLAu71nGwSFB\nMBmI4d0nslAelp5LI55DiFKGYhk/t+oE46SFwyS6MhIY3QEg+Hq+pEsKX7R5Egs1\nL9BR5lj/XQcz6mJ5sdJ0mFti2lV+xecqc/Tn4ndbG0DOxDyJsxg2PgkfJhm5Ois7\ndxPCKgmDjwKBgES1tUnPKuDxvzKQj0ScGYF4A33cAc9zPGEVAlA0YxkEDmfoF/ml\nObjl8eWYHDP4Qqfyddc5Vb5VkjzeEMEhvaFxzV/4/4ZyLjYtj7nI4xrOlAp5C4+r\n8zf7NkqZmnopVy3ctudRU1Vb8Vi23GdfHvJzEM9mHZ3wBVZcOt2c6T1PAoGBAMWe\nanZblaZc6uKH8QaPocSehrcJr9PhVAD//Ktz7xRLRJ2dEaj5i5PIWkQ3fF9be4xR\niEJpJpYV+xBkn8iCWazT1UUVdnumSKruyhhlLZJYijF18PfM3ij/E0BV0EIbbJt4\nwXOx6PtRNojXjTNuIiRR5S/RLcjx6JWZ7qHxB3FVAoGAL7cvc0ZLd+0xrh9K900m\n9mX31jTr721ceFVHGj/Ow08h8G6tNb7HsySxRxmi2gRmvYLTvhoxvSEYtQ/eILjm\nSQR6h53nF1NvjcQ6xsEM/X3ksPm/nymMplexWQIvDO+n9f1ThRRLl556JuO4mE19\nhw4BpohXUkcNf/Gm6Xy6wD4=\n-----END PRIVATE KEY-----\n",
    "client_email": "reservation-scheduler@datalkbot-pkyl.iam.gserviceaccount.com",
    "client_id": "110626556685549650297",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/reservation-scheduler%40datalkbot-pkyl.iam.gserviceaccount.com"
  };
  

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'Asia/Kolkata';
const timeZoneOffset = '+05:30';

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log("Parameters", agent.parameters);
    const appointment_type = agent.parameters.AppointmentType;

    function makeAppointment(agent) {
        // Calculate appointment start and end datetimes (end = +1hr from start)
        const dateTimeStart = new Date(new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0])));
        console.log("expected String", agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset);
        const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
        const appointmentTimeString = dateTimeStart.toLocaleString(
            'en-US', { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
        );
        // Check the availability of the time, and make an appointment if there is time on the calendar
        console.log("dateTimeStart", dateTimeStart);
        console.log("dateTimeEnd", dateTimeEnd);
        console.log("appointmentTimeString", appointmentTimeString);
        return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
            agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
        }).catch(() => {
            agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
        });
    }

    // Handle the Dialogflow intent named 'Schedule Appointment'.
    let intentMap = new Map();
    intentMap.set('Book Table', makeAppointment);
    agent.handleRequest(intentMap);
});

//Creates calendar event in Google Calendar
function createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type) {
    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: serviceAccountAuth, // List events for time period
            calendarId: calendarId,
            timeMin: dateTimeStart.toISOString(),
            timeMax: dateTimeEnd.toISOString()
        }, (err, calendarResponse) => {
            // Check if there is a event already on the Calendar
            if (err || calendarResponse.data.items.length > 0) {
                reject(err || new Error('Requested time conflicts with another appointment'));
            } else {
                // Create event for the requested time period
                calendar.events.insert({
                    auth: serviceAccountAuth,
                    calendarId: calendarId,
                    resource: {
                        summary: appointment_type + ' Appointment',
                        description: appointment_type,
                        start: { dateTime: dateTimeStart },
                        end: { dateTime: dateTimeEnd }
                    }
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                });
            }
        });
    });
}