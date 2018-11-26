import React, {Component} from 'react';
import {connect} from 'react-redux';

//import Form from '../../../components/UI/Input/Form/Form';
import Form from 'reform-sze';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import {axiosOrder} from '../../../axios';

import './ContactData.css';
const ERROR_MSG = {
  required: ' is required',
  minLength: ' has to be at least {{val}} characters',
  maxLength: ' can\'t be longer then {{val}} characters',

  numeric: ' has to be a number',
  numericMin: ' has to be a minimum of {{val}}',
  numericMax: ' can\'t be greater then {{val}}'
};

class ContactData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      orderPlaced: false,
      orderForm: {
        name: {
          type: 'input',
          validation: {
            required: true,
          },
          attributes: {
            onChange: (e) => this.userInputChangeHandler(e, 'name'),
            value: '',
            type: 'text',
            placeholder: 'Your name...'
          }
        },
        email: {
          type: 'input',
          validation: {
            required: true,
          },
          attributes: {
            onChange: (e) => this.userInputChangeHandler(e, 'email'),
            value: '',
            name: 'user_email',
            type: 'email',
            placeholder: 'Your email...'
          },
        },
        address: {
          street: {
            type: 'input',
            validation: {
              required: true,
            },
            attributes: {
              onChange: (e) => this.userInputChangeHandler(e, 'address.street'),
              value: '',
              type: 'text',
              placeholder: 'Your street and house number...'
            },
          },
          zipCode: {
            type: 'input',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5,
            },
            attributes: {
              onChange: (e) => this.userInputChangeHandler(e, 'address.zipCode'),
              value: '',
              type: 'text',
              placeholder: 'Your zip code...'
            },
          },
          country: {
            countryname: {
              type: 'input',
              validation: {
                required: true,
              },
              attributes: {
                onChange: (e) => this.userInputChangeHandler(e, 'address.country.countryname'),
                value: '',
                type: 'text',
                placeholder: 'The country you live in'
              },
            },
            state: {
              type: 'input',
              validation: {
                required: true,
              },
              attributes: {
                onChange: (e) => this.userInputChangeHandler(e, 'address.country.state'),
                value: '',
                type: 'text',
                placeholder: 'The state you live in'
              },
            }
          }
        },
        notice: {
          type: 'input',
          validation: {
            required: true
          },
          attributes: {
            onChange: (e) => this.userInputChangeHandler(e, 'notice'),
            value: '',
            placeholder: 'Add some notes for us'
          }
        },
        deliveryMethod: {
          label: 'Delivery Method',
          type: 'select',
          options: [
            {name: 'fastest'},
            {name: 'cheapest'},
            {name: 'test'}
          ],
          attributes: {
            onChange: (e) => this.userInputChangeHandler(e, 'deliveryMethod'),
            value: 'fastest',
          }
        },
        'submit': {
          label: 'ORDER',
          showLabel: false,
          type: 'button',
          attributes: {
            className: 'btn btn-success',
            onClick: (e) => this.orderHandler(e)
          }
        }
      }
    }
    this.formRef = React.createRef();
  }

  nestedUserInputChangeHandler = (event, inputId) => {
    const orderForm = {...this.state.orderForm};
    const paths = inputId.split('.');
    let objectList = [orderForm];

    for(let p in paths) {
      objectList.push({...objectList[p][paths[p]]});
    }

    const objAttr = {...objectList[objectList.length - 1].attributes};
    objAttr.value = event.target.value;
    objectList[objectList.length - 1].attributes = objAttr;
    let updatedObject = objectList[objectList.length - 1];

    for(let index = objectList.length - 1; index > 0; index--) {

      updatedObject = {
        ...objectList[index-1],
        [paths[index-1]]: {...updatedObject},
      };

    }

    this.setState({orderForm: updatedObject});
  }

  userInputChangeHandler = (event, inputId) => {
    if(inputId.includes('.')) {
      this.nestedUserInputChangeHandler(event, inputId);
    } else {
      const updatedOrderForm = {...this.state.orderForm};
      const updatedElementAttributes = {...updatedOrderForm[inputId].attributes};

      updatedElementAttributes.value = event.target.value;
      updatedOrderForm[inputId].attributes = updatedElementAttributes;
      this.setState({orderForm: updatedOrderForm});
    }
  }
  // userInputChangeHandler = (event, inputId, orderForm = null, rootElement = []) => {
  //   const updatedOrderForm = orderForm === null ? {...this.state.orderForm} : orderForm;
  //
  //   if(inputId.includes('.')) {
  //     const paths = inputId.split('.')
  //     rootElement.push(paths[0]);
  //
  //     const element = {...updatedOrderForm[paths.shift()]};
  //
  //     return this.userInputChangeHandler(event, paths.join('.'), element, rootElement);
  //   }
  //
  //   const updatedElementAttributes = {...updatedOrderForm[inputId].attributes};
  //   updatedElementAttributes.value = event.target.value;
  //
  //   updatedOrderForm[inputId].attributes = updatedElementAttributes;
  //
  //   if(rootElement === null) {
  //     this.setState(Object.assign(this.state.orderForm, updatedOrderForm));
  //   } else {
  //     let obj = '';
  //     for(let el of rootElement) {
  //       obj += '["' + el + '"]';
  //     }
  //     obj = eval(`this.state.orderForm${obj}`);
  //     this.setState(Object.assign(obj, updatedOrderForm));
  //   }
  // }

  getCustomerFormData(elements) {
    const customerData = {};
    for(let index in elements) {
      if(elements[index].type === 'button') {
        continue;
      }

      if(elements[index].attributes === undefined) {
        customerData[index] = this.getCustomerFormData(elements[index]);
      } else {
        customerData[index] = elements[index].attributes.value;
      }
    }
    return customerData;
  }

  setFormErrors(errorElements, baseElements = null) {
    let orderFormCopy = baseElements === null ? this.resetFormErrors() : baseElements;

    for(let el in errorElements) {
      const elementCopy = {...orderFormCopy[el]};

      if(orderFormCopy[el].type === undefined) {
        orderFormCopy[el] = this.setFormErrors(errorElements[el], orderFormCopy[el]);
        continue;
      }

      let errors = [];
      for(let rule in elementCopy.validation) {
        errors.push(el + ERROR_MSG[rule].replace('{{val}}', elementCopy.validation[rule]))
      }
      elementCopy.errors = errors;
      orderFormCopy[el] = elementCopy;
    }

    return orderFormCopy;
  }

  resetFormErrors(baseElements = null) {
    let orderFormCopy = baseElements === null ? {...this.state.orderForm} : baseElements;
    let clearedElements = {...orderFormCopy};

    for(let el in orderFormCopy) {
      if(orderFormCopy[el].type === undefined) {
        clearedElements[el] = this.resetFormErrors(orderFormCopy[el]);
        continue;
      }

      if(!orderFormCopy[el].errors) {
        continue;
      }

      const elementCopy = {...orderFormCopy[el]};
      let errorElementCopy = elementCopy.errors.slice();

      errorElementCopy = null;
      elementCopy.errors = errorElementCopy;
      clearedElements[el] = elementCopy;
    }

    return clearedElements;
  }

  orderHandler = (event) => {
    event.preventDefault();
    const validation = this.formRef.current.validate();

    if(validation.allValid === false) {
      const updatedForm = this.setFormErrors(validation.invalid);
      this.setState({orderForm: updatedForm});
      return;
    }

    const costumerData = this.getCustomerFormData(this.state.orderForm);

    this.setState({loading: true},() => {
      const orderData = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: costumerData,
      };

      axiosOrder.post('/orders.json', orderData).then(res => {
        this.setState({loading: false, orderPlaced: true});
      });
    });
  }

  render() {
    return(
      <div className='contactData pa3 shadow-3'>
        {this.state.loading ? <Spinner showBackdrop /> : null}
        {this.state.orderPlaced ? <Modal closed={() => {this.props.history.push('/')}} show>Your order has been placed</Modal> : null}
        <h4>Enter your contact data</h4>
        <Form ref={this.formRef} elements={this.state.orderForm}>

        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
