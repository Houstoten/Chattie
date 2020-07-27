import { all } from "redux-saga/effects";
import messageSagas from "../Chat/sagas";
import inputSagas from "../MessageInput/sagas"
import editMessageSagas from "../MessageEdit/sagas"

export default function* rootSaga() {
    yield all([
        messageSagas(),
        inputSagas(),
        editMessageSagas()
    ]);
}