// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from '../../utils/firebase'

export default async (req, res) => {

    var data = []

    firebase.firestore().collection('services').get().then((result) => {
        result.forEach(doc => {
            data.push(doc.data());
        })
        res.json(data)
    });


      
}