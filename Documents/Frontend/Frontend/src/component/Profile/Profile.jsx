import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Input, Button, Form, Typography, Card, Row, Col, Avatar, Space, message } from 'antd';
import { updateUserLoginAction } from '../../store/redux/reducers/userReducer';
import { fetchUserByIdAction } from '../../store/redux/action/userAction';

const { Content } = Layout;
const { Title } = Typography;

const MyProfile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userLogin = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (userLogin) {
      dispatch(fetchUserByIdAction(userLogin.userId));
    }
  }, [dispatch, userLogin]);

  useEffect(() => {
    if (userLogin) {
      form.setFieldsValue({
        roleId: userLogin?.roleId,
        password: userLogin?.password,
        email: userLogin?.email,
        fullName: userLogin?.fullName,
        phone: userLogin?.phone,
        address: userLogin?.address,
        imageUrl: userLogin?.imageUrl,
        experience: userLogin?.experience,
        status: userLogin?.status,
      });
    }
  }, [userLogin, form]);

  const handleSubmit = (values) => {
    const userDetails = {
      roleId: userLogin?.roleId,
      password: values.password || userLogin?.password,
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
      imageUrl: values.imageUrl,
      experience: Number(values.experience) || 0,
      status: true,
    };

    dispatch(updateUserByIdAction(userLogin.userId, userDetails))
      .then(() => {
        message.success('Cập nhật thông tin thành công!');
        dispatch(updateUserLoginAction(userDetails));
        dispatch(fetchUserByIdAction(userLogin.userId));
      })
      .catch((error) => {
        message.error('Cập nhật thông tin thất bại: ' + (error.message || 'Lỗi không xác định'));
      });
  };

  if (!userLogin) {
    return null; // Render nothing if userLogin is null
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Content style={{ padding: '80px 24px', marginTop: '64px' }}>
        <Card style={{ maxWidth: 1200, margin: '0 auto', padding: 24, borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Title level={3}>Thông tin cá nhân</Title>
              <Avatar
                size={120} // Tăng kích thước avatar
                src={userLogin?.imageUrl || 'https://via.placeholder.com/120'}
                style={{ marginBottom: '16px', border: '2px solid #1890ff' }}
              />
              <Title level={4}>{userLogin?.fullName}</Title>
              <p>{userLogin?.email}</p>
              <p>{userLogin?.phone}</p>
              <p>{userLogin?.address}</p>
            </Col>
            <Col span={16}>
             
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Họ và Tên" name="fullName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Số Điện Thoại" name="phone">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Địa Chỉ" name="address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mật Khẩu" name="password">
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="URL Hình Ảnh" name="imageUrl">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Kinh Nghiệm" name="experience">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Vai Trò" name="roleId">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Trạng Thái" name="status">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Lưu
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default MyProfile;