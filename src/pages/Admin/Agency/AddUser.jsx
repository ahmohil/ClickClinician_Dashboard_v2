import React, {useState, useEffect} from 'react';
import { Form, Input, Select, Button, Card, Row, Col } from 'antd';
import { useLocation,useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../../../api';

const { Option } = Select;

const CreateUser = () => {
  const location = useLocation();
  const agencyData = location.state?.agencyData;
  const [form] = Form.useForm();
  const { agencyId } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRequest('api/RolesForAgency');
        setRoles(response);
      } catch (error) {
        console.error('Error fetching roles:', error);
        message.error('Failed to fetch roles');
      }
    };

    fetchRoles();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await postRequest(`api/User/CreateForAgency?agencyId=${agencyId}`, values);
      message.success('User created successfully');
      form.resetFields();
    } catch (error) {
      let errorMessage = 'Failed to create user';
      if (error.response && error.response.data) {
        const { message, detail } = error.response.data;
        errorMessage = message || errorMessage;
        console.error('Error details:', detail);
      }
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={<div className='d-flex justify-content-between'><span>Create New User</span> <span>{agencyData?.name}</span></div>} style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="displayName"
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select placeholder="Select a role">
                {roles?.map(role => (
                  <Option key={role} value={role}>{role}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm the password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="streetAddress"
              label="Street Address"
              rules={[{ required: false, message: 'Please input the street address!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="suite" label="Suite/Apt/House Number">
              <Input />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: false, message: 'Please input the city!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: false, message: 'Please input the state!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[{ required: false, message: 'Please input the zip code!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateUser;