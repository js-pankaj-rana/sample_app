import React, { Component, ReactElement } from 'react';

interface ErrorWrapperState {
    hasError: boolean;
}

interface ElementProps {
    children: ReactElement;
}

class ErrorWrapper extends Component<ElementProps, ErrorWrapperState> {
    constructor(props: ElementProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorWrapperState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // You can log the error to an error reporting service here
        console.log("Error caught by ErrorWrapper:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
          
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorWrapper;
