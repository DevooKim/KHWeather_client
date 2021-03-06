import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState((prev) => !prev), []);
    const setTrue = useCallback(() => setState(true), []);
    const setFalse = useCallback(() => setState(false), []);

    return [state, toggle, setTrue, setFalse];
};

export default useToggle;
