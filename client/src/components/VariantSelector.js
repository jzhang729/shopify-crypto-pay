import React, { Component } from 'react';
import { TextContainer, ChoiceList } from '@shopify/polaris';

class VariantSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [props.variants[0].id]
    };
  }

  onChange(selected) {
    this.setState({ selected });
  }

  renderVariantSelector(variants) {
    const choices = variants.map(({ title, id }) => {
      return { label: title, value: id };
    });

    return (
      <ChoiceList
        choices={choices}
        selected={this.state.selected}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  render() {
    return (
      <TextContainer spacing="loose">
        {this.renderVariantSelector(this.props.variants)}
        <p>
          <strong>${this.props.variants[0].price} USD</strong>
        </p>
      </TextContainer>
    );
  }
}

export default VariantSelector;
