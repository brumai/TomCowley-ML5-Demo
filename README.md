# AI-ified apps with ml5js
Two example apps that have had some machine learning added to them using the open source project [ml5js](https://ml5js.org).
​
Note that once the models are loaded, both are able to work offline.
​
## inspAIre

Uses the [Image Classifier](https://ml5js.org/reference/api-ImageClassifier/) from ml5js to look at a random image and give a prediction as to what is in the image.

It can take three different pre-trained models:   
`'MobileNet' | Darknet' | 'Darnet-tiny'`   
Open `inspaire.js` and edit `classifierType` to change between the models.
It's interesting to see the network activity when changing between models.

### Running
* Navigate to folder `/inspAIre`
* Open `index.html` in a web browser

## Algebra Ninjas
Uses the [Sound Classifier](https://ml5js.org/reference/api-soundClassifier/) to detect voice inputs. It is trained against a model that can detect numbers 1 - 9. It also accepts keyboard input.

### Running
* Navigate to folder `/an`
* Open `index.html` in a web browser
