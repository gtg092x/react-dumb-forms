import ModelContainer from './ModelContainer';
import SimpleForm from '../forms/SimpleForm'
import CustomInputForm from '../forms/CustomInputForm';
import TextAreaForm from '../forms/TextAreaForm';
import FieldsetForm from '../forms/FieldsetForm';
import RadioForm from '../forms/RadioForm';

export default {
    simple: {
        title: 'Container State',
        description: 'Data is stored in container state',
        Component: ModelContainer,
        FormComponent: SimpleForm,
        containerName: 'ModelContainer',
        formName: 'SimpleForm',
        props: {
            model: {firstName: 'John', lastName: 'Doe'}
        }
    },
    customInput: {
        title: 'Custom Input',
        description: 'Custom Input Field',
        Component: ModelContainer,
        FormComponent: CustomInputForm,
        containerName: 'ModelContainer',
        formName: 'CustomInputForm',
        props: {
            model: {firstName: 'John'}
        }
    },
    textArea: {
        title: 'Text Area',
        description: 'Using a text area.',
        Component: ModelContainer,
        FormComponent: TextAreaForm,
        containerName: 'ModelContainer',
        formName: 'TextAreaForm',
        props: {
            model: {aboutMe: 'Hey! Nice to meet you.'}
        }
    },
    fieldset: {
        title: 'Fieldset Form',
        description: 'Using a fieldset.',
        Component: ModelContainer,
        FormComponent: FieldsetForm,
        containerName: 'ModelContainer',
        formName: 'FieldsetForm',
        props: {
            model: {
                'homeAddress.address': '123 Test Home',
                'homeAddress.mail': true,
                'homeAddress.phone.number': '(555) 555-5555',
                'homeAddress.phone.extension': '+123',
                'homeAddress.fax.number': '(555) 555-5555',
                'homeAddress.fax.extension': '+123',
                'businessAddress.address': '123 Test Business',
                'businessAddress.mail': true,
                'businessAddress.phone.number': '(555) 555-5555',
                'businessAddress.phone.extension': '+123',
                'businessAddress.fax.number': '(555) 555-5555',
                'businessAddress.fax.extension': '+123'
            }
        }
    },
    radio: {
        title: 'Radio Form',
        description: 'Using a radio buttons.',
        Component: ModelContainer,
        FormComponent: RadioForm,
        containerName: 'ModelContainer',
        formName: 'RadioForm',
        props: {
            model: {
                'favoriteColor': 'blue',
                'isFlake': true
            }
        }
    },
    /*validation: {
     title: 'Validation',
     description: 'form with json schema validation',
     Component: Validation,
     }*/
};
