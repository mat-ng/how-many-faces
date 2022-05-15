# How Many Faces

The app can be accessed [here](https://how-many-faces.herokuapp.com).

How Many Faces is a fullstack web application for teachers/event organizers to take attendance of their participants. They simply need to point their device's camera towards a group, then the app will detect the number of peoples' faces and send the user a text with the attendance report.

The site was created using TensorFlow to detect peoples' faces and the [Twilio API](https://www.twilio.com) to text users their attendance reports.

## Inspiration

While in class, I often noticed that teachers waste a significant portion of their time taking attendance of how many people are in class. The same observation applied to event organizers, as well as anyone trying to host a gathering. I understood that this process was important in the context of organizing events, but I believed that it could be optimized.

This lead to my idea of How Many Faces. By having users simply point their device's camera towards their group to determine attendance numbers, this process would be hugely optimized and reduce any time wasted.

## Goals

After getting inspired, I developed 2 main goals for this app:

1. How Many Faces should be able to detect faces with high accuracy, so users receive accurate attendance reports.

2. How Many Faces should offer a way for users to save their attendance reports, so they can refer back to previous reports and compare numbers.

## Development

My first idea was to use TensorFlow to detect faces from the device's camera. As such, I could deploy a convolutional neural network to classify the faces in the images that are uploaded by users. Then, I could display relevant data for the user (how many faces were detected, where the faces are detected, etc.).

My second idea was to use the [Twilio API](https://www.twilio.com) so that users could save their attendance reports. Since Twilio enables the application to send text messages, users would simply need to input their own phone numbers to receive a text of their attendance reports whenever requested. As such, they could access any previous attendance reports on their local devices by checking their text history with Twilio.

Then, I coded the front-end in React. I leveraged the React Webcam library to access users' cameras in the application. And in terms of the back-end, I used Express and set up an API endpoint for users to send themselves text messages through the Twilio API.

## Final Result

How Many Faces can be accessed [here](https://how-many-faces.herokuapp.com).

## License

[Apache License 2.0](https://github.com/mat-ng/how-many-faces/blob/master/LICENSE)

