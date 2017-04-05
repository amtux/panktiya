import PushNotification from 'react-native-push-notification';

const FIRST_NOTIFCATION_HOUR = 8;

class PankityaNotificationsManager {
    init(onOpenNotification){
        PushNotification.configure({
            onNotification: onOpenNotification,
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
            // senderID: "YOUR GCM SENDER ID",
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    setInitialNotif(){
        var notifcation_date  = new Date();
        PushNotification.localNotificationSchedule({
            message: "🙏 New pankti from Guru Granth Sahib Ji",
            date: notifcation_date,
            number: '0'
        });
    }

    setNumberOfNotifications(count){

        PushNotification.cancelAllLocalNotifications();

        for(var i = 0; i < count; i++){
            var notification_hr = FIRST_NOTIFCATION_HOUR+(i*(4-(count-4)));

            var notifcation_date  = new Date();
            notifcation_date.setHours(notification_hr);
            notifcation_date.setMinutes(0);
            notifcation_date.setSeconds(0)
            notifcation_date.setMilliseconds(0);

            PushNotification.localNotificationSchedule({
                message: "🙏 New pankti from Guru Granth Sahib Ji",
                date: notifcation_date,
                number: '0',
                repeatType: 'day'
            });
        }
        
    
    }

    // PushNotification.localNotificationSchedule({
    //     message: "🙏 New pankti from Guru Granth Sahib Ji",
    //     date: new Date(Date.now() + (10 * 1000)),
    //     number: '0',
    //     repeatType: 'minute'
    // });
    
}

export default new PankityaNotificationsManager();