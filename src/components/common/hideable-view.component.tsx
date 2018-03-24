import React, { Component } from 'react';
import { Animated } from 'react-native';

interface State { [key: string]: any }
interface Props { [key: string]: any }

class HideableView extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(this.props.visible ? 1 : 0)
        };
    }

    animate(show) {
        const duration = this.props.duration ? parseInt(this.props.duration, 10) : 500;
        Animated.timing(
            this.state.opacity, {
                toValue: show ? 1 : 0,
                duration: !this.props.noAnimation ? duration : 0
            }
        ).start();
    }

    componentWillUpdate(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            this.animate(nextProps.visible);
        }
    }

    render() {
        if (this.props.removeWhenHidden && !this.props.visible) {
            return null;
        }

        return (
            <Animated.View style={[this.props.style, {opacity: this.state.opacity}]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export {HideableView};
