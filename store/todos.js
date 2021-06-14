import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
    todos: []
})

export const actions = {
    // 初期設定
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('todos', todosRef)
    }),
    // 追加
    add: firestoreAction((context, name) => {
        if(name.trim()) {
            todosRef.add({
                name: name,
                done: false,
                created: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }),
    // 削除
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
    // チェックボックス操作時の処理
    toggle: firestoreAction((context, todo) => {
        todosRef.doc(todo.id).update({
            done: !todo.done
        })
    })
}

export const getters = {
    orderdTodos: state => {
        return _.sortBy(state.todos, 'created')
    }
}