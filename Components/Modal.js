import * as React from 'react';
import { Modal, Portal, Text, Provider } from 'react-native-paper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from './CustomTextInput';
import ValidationErrorContainer from './ValidationErrorContainer';

var { width, height } = Dimensions.get('window');

const ModalComponent = ({
  item,
  visible,
  hideModal,
  changeButtonHandler,
  showModal,
}) => {
  const upSchema = Yup.object().shape({
    name: Yup.string()
      .required('name is required')
      .min(5, 'Too Short!')
      .max(50, 'Too Long!'),
    score: Yup.number().required('Score is required').max(99, 'Too Long!'),
  });

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <ImageBackground
            source={{
              uri: `http://placeimg.com/120/120/person/${item?.id}`,
            }}
            resizeMode="cover"
            style={styles.image}
          >
            <Formik
              validateOnChange
              initialValues={{
                name: item?.name,
                score: item?.score.toString(),
                id: item?.id,
              }}
              validationSchema={upSchema}
              onSubmit={(values) => {
                changeButtonHandler(values);
                hideModal();
                //   alert(JSON.stringify(values));
              }}
            >
              {(
                {
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                } // props of formik
              ) => (
                <View style={styles.firstRow}>
                  <CustomTextInput
                    containerStyle={{ width: width * 0.5, marginVertical: 20 }}
                    placeholder="First Name"
                    autoComplete="name"
                    autoCapitalize="none"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={touched.name && errors.name}
                  />

                  <ValidationErrorContainer
                    touched={touched.name}
                    error={errors.name}
                  />

                  <CustomTextInput
                    containerStyle={{ width: width * 0.5, marginVertical: 20 }}
                    placeholder="Score"
                    value={values.score}
                    keyboardType="numeric"
                    onChangeText={(num) => {
                      setFieldValue('score', parseInt(num));
                    }}
                    onBlur={handleBlur('score')}
                    error={touched.score && errors.score}
                  />
                  <ValidationErrorContainer
                    touched={touched.score}
                    error={errors.score}
                  />

                  <View style={[{ marginTop: 20 }]}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ImageBackground>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  containerStyle: {
    width: width * 0.8,
    borderRadius: 30,

    overflow: 'hidden',
    backgroundColor: 'rgba(27,27,27,.8)',
    marginLeft: width * 0.1,
  },
  iconContainer: {
    position: 'relative',
    flexDirection: 'row',
    height: 25,
    width: 25,
  },
  firstRow: {
    flexDirection: 'column',
    width: width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'orange',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 25,
    width: width * 0.5,
    height: width * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    paddingVertical: 20,
  },
});
