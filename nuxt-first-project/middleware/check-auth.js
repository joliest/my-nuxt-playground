export default function (context) {
    // calls if token is valid for every components that uses this middle ware
    if (process.client) {
        context.store.dispatch('initAuth');
    }
}