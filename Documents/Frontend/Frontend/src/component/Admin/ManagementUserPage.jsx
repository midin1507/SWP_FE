import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Col, Radio, Drawer, List, Row, Typography, Modal, Form, Input, Card, Table, Select, notification } from 'antd';
import { EyeOutlined, UserSwitchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageUsersPage.module.scss';
import { fetchUsersAction } from '../../store/redux/action/userAction';
import { fetchUserByIdAction } from '../../store/redux/action/userAction';
const { confirm } = Modal;
const { Option } = Select;

const ManageUsersPage = () => {
  const [open, setOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [filterRole, setFilterRole] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.userReducer.listUser);
  const userDetailData = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(usersData)) {
      console.error('usersData is not an array:', usersData);
    }
  }, [usersData]);

  const roleMapping = {
    manager: 'Manager',
    staff: 'Staff',
    member: 'Member',
  };

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
  };

  const filteredusersData = Array.isArray(usersData) ? usersData.filter(user => {
    const matchesStatus = filterRole === 'all' || 
                          (filterRole === 'manager' && user.roleId === 'manager') ||
                          (filterRole === 'member' && user.roleId === 'member') ||
                          (filterRole === 'staff' && user.roleId === 'staff');
    
    const matchesSearch = !searchValue ||
                          (user.fullName && user.fullName.toLowerCase().includes(searchValue)) ||
                          (user.email && user.email.toLowerCase().includes(searchValue)) ||
                          (user.address && user.address.toLowerCase().includes(searchValue));
    return matchesStatus && matchesSearch;
  }) : [];

  const showDrawer = (title, user = null) => {
    setDrawerTitle(title);
    setSelectedUser(user);
    setOpen(true); 

    if (user) {
      dispatch(fetchUserByIdAction(user.userId));
    } else {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        fullName: userDetailData.fullName || '',
        email: userDetailData.email || '',
        roleId: userDetailData.roleId || '',
        address: userDetailData.address || '',
        phone: userDetailData.phone || '',
        imageUrl: userDetailData.imageUrl || '',
        experience: userDetailData.experience || 0,
      });
    }
  }, [userDetailData, selectedUser, form]);

  const closeDrawer = () => {
    setOpen(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleView = async (id) => {
    try {
      dispatch(fetchUserByIdAction(id));
      showDrawer('View User', { userId: id });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleToggleStatus = (id) => {
    const user = usersData.find(user => user.userId === id);
    if (user) {
      confirm({
        title: `Are you sure you want to ${user.status ? 'deactivate' : 'activate'} this user?`,
        onOk() {
          dispatch(updateUserAction(user.userId, { status: !user.status }))
            .then(() => {
              notification.success({
                message: 'Success',
                description: `User ${user.status ? 'deactivated' : 'activated'} successfully`,
              });
              dispatch(fetchUsersAction());
            })
            .catch(() => {
              notification.error({
                message: 'Error',
                description: `Failed to ${user.status ? 'deactivate' : 'activate'} user`,
              });
            });
        },
      });
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'roleId', key: 'roleId', render: roleId => roleMapping[roleId] },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (status ? 'Active' : 'Inactive') },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.userId)}>View</Button>
          <Button type="link" icon={<UserSwitchOutlined />} onClick={() => handleToggleStatus(record.userId)}>
            {record.status ? 'Deactivate' : 'Activate'}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageUsersPage}>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      <Radio.Group 
        onChange={(e) => setFilterRole(e.target.value)} 
        value={filterRole}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="manager">Manager</Radio.Button>
        <Radio.Button value="member">Member</Radio.Button>
        <Radio.Button value="staff">Staff</Radio.Button>
      </Radio.Group>
      <Table 
        dataSource={filteredusersData} 
        columns={columns} 
        rowKey="userId" 
      />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={open}
        afterVisibleChange={(visible) => {
          if (!visible) {
            form.resetFields();
          }
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="fullName" label="Full Name">
            <Input placeholder="Please enter the full name" disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Please enter the email" disabled />
          </Form.Item>
          <Form.Item name="roleId" label="Role">
            <Select placeholder="Please select the role" disabled>
              <Option value="manager">Manager</Option>
              <Option value="staff">Staff</Option>
              <Option value="member">Member</Option>
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Please enter the address" disabled />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="Please enter the phone number" disabled />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL">
            <Input placeholder="Please enter the image URL" disabled />
          </Form.Item>
          <Form.Item name="experience" label="Experience">
            <Input type="number" placeholder="Please enter the experience" disabled />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageUsersPage;
