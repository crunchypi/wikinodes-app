// # This class is a bare implementation of what can be thought
// # of as an observer pattern but with the difference that this
// # class stores multiple different observers and can be used
// # by multiple different subjects at the same time. This is
// # because of a inner registry that tracks references and
// # identifier strings. It may be a bit of a mess but is better
// # than- and an alternative to passing callbacks up, down and
// # between react components (between component children).
// #
// # The setup and usage is very simple and here is a brief
// # usage pointer (more details are in the very short cls):
// #    You have two components, the former (A) wants to
// #    notify the latter (B) with a callback when some
// #    new state/event happens.
// # 
// #    Give a shared instance of this class to both components
// #    and register B as an observer by calling 'registerObserver'.
// #    The arguments here (read the doc above the method) should
// #    provide enough information to keep everything unique, even
// #    if B is one of many instances of some class, and all instances
// #    are registered. 
// # 
// #    Then, when an even occurs and A want's to notify, call
// #    'callbackFuncs', which gives an array of functions, and
// #    use them. The function signature of these callbacks hasn't
// #    gotten much consideration in this implementation, since the
// #    class below was written to solve a specific purpose (pass
// #    just a string in a couple of callbacks).
// #    



export default class CallbackManager {
    constructor() {
        // # Registry is the entire state for this class -- it is
        // # a map where keys are strings identifying subjects
        // # (observer patter), while values are arrays with
        // # of arrays, where the inner has the following form:
        // #    -   Index 0 is a reference to an observer (this
        // #        from an observer). It is used such that
        // #        multiple instances of a specific observer
        // #        can exist in this array, where the other
        // #        identifier (index 1) is the same.
        // #    -   Index 1 specifies a function name for an
        // #        observer. This is used such that one observer
        // #        reference (index 0) can have multiple funcs.
        // #    -   Index 2 is the callback. For simplicity and
        // #        the specific use-case of this app, the policy
        // #        is one argument per func (unless it makes 
        // #        sense and is obvious to do otherwise)
        // #
        // # Visual example: 
        // # {
        // #    subjectClassName.subjectFuncName: [
        // #        [observerInstanceRef, funcName, callback],
        // #        ...
        // #    ],
        // #    ...
        // # }
        this.registry = {}
    }

    // # Here, an observer instance can register a callback
    // # for a subject. The callback is called when a subject
    // # decides. The arguments are as follows:
    // #    subjectClassName    : proper class name of target subject.
    // #    subjectFuncName     : proper func name of target subject cls.
    // #    observerRef         : reference from observer (use 'this' here).
    // #    observerFuncName    : the func name in which this func is called.
    // #    callback            : callback
    registerObserver(subjectClassName, subjectFuncName,
                        observerRef, observerFuncName,
                            callback) {

        let idSubject = `${subjectClassName}.${subjectFuncName}`

        // # Try get the specified subject in the registry.
        // # Create it if it doesn't exist.
        let subjectCandidate = this.registry[idSubject]
        if (subjectCandidate == undefined) {
            this.registry[idSubject] = []
            subjectCandidate = this.registry[idSubject]
        }

        // # Try to get the specified observer in the registry
        // # for the specified subject.
        let observerCandidate = subjectCandidate.filter(arr => {
            // # Index 0 is the reference (this from observer).
            // # Index 1 is the callback function name id.
            return arr[0] === observerRef && arr[1] === observerFuncName 
        })

        // # Create observer and callback pair if it doesn't
        // # exist for that subject.
        if (observerCandidate.length == 0) {
            subjectCandidate.push([observerRef, observerFuncName, callback])
        } else {
            // # Update callback.
            observerCandidate[2] = callback
        }
    }

    // # Get all observer callback funcs for a specific
    // # subject. Use case: when a subject wants to notify
    // # observers.
    callbackFuncs(subjectClassName, subjectFuncName) {
        let idSubject = `${subjectClassName}.${subjectFuncName}`
        let observers = this.registry[idSubject]
        if (observers == undefined) {
            return []
        }
        return observers.map(arr => arr[2])
    }
}
