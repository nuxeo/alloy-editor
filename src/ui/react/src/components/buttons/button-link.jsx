(function () {
    'use strict';

    var mix = AlloyEditor.OOP.mix;

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
     *
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     *
     * @class ButtonLink
     */
    class ButtonLink extends mix(React.Component).with(AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses) {
        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + 76 /*L*/
                }
            };
        }

        /**
         * Checks if the current selection is contained within a link.
         *
         * @method isActive
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive() {
            return (new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null);
        }

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonLinkEdit {...this.props} />
                );
            } else {
                return (
                    <button aria-label={AlloyEditor.Strings.link} className={cssClass} data-type="button-link" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                        <span className="ae-icon-link"></span>
                    </button>
                );
            }
        }

        /**
         * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
         *
         * @protected
         * @method _requestExclusive
         */
        _requestExclusive() {
            this.props.requestExclusive(ButtonLink.key);
        }
    }

    // Allows validating props being passed to the component.
    ButtonLink.propTypes = {
        /**
         * The editor instance where the component is being used.
         *
         * @property {Object} editor
         */
        editor: React.PropTypes.object.isRequired,

        /**
         * The label that should be used for accessibility purposes.
         *
         * @property {String} label
         */
        label: React.PropTypes.string,

        /**
         * The tabIndex of the button in its toolbar current state. A value other than -1
         * means that the button has focus and is the active element.
         *
         * @property {Number} tabIndex
         */
        tabIndex: React.PropTypes.number
    };

    // Lifecycle. Provides static properties to the widget.
    ButtonLink.statics = {
        /**
         * The name which will be used as an alias of the button in the configuration.
         *
         * @static
         * @property {String} key
         * @default link
         */
        key: 'link'
    };

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
}());