import React from 'react'
import { Modal, Form, Input, Row, Col,Select } from "antd";
import axios from '../http';
import { message } from 'antd';

const { Option } = Select;

const TodoForm = ({
    showTodoForm,
    setShowTodoForm,
    type,
    selectedTodo,
    getData,
    setSelectedTodo,
}:any) => {
    const [form] = Form.useForm();

    const onFinish = async (values:Object) => {
      console.log(values);
        try {
          let response = null;
          if (type === "add") {
            response = await axios.post("/api/todo/add-todo", {
              ...values,
            });
          } else {
            response = await axios.post("/api/todo/edit-todo", {
              ...values,
              id: selectedTodo._id,
            });
          }
          if (response.data.success) {
            message.success(response.data.message);
            setShowTodoForm(false);
          } else {
            message.error(response.data.message);
          }
          getData();
          setShowTodoForm(false);
          setSelectedTodo(null);
        } catch (error) {
          console.log(error);
        }
      };

    const handleStatusChange = (value:unknown) => {
        switch (value) {
          case 'done':
            form.setFieldsValue({
              status: 'done',
            });
            break;
          case 'not done':
            form.setFieldsValue({
              note: 'not done',
            });
            break;
          default:
        }
        };
  return (
    <div>
    <Modal
      title="Add Todo"
      width={750}
      open={showTodoForm}
      onCancel={() => {
        setSelectedTodo(null);
        setShowTodoForm(false);
      }}
      footer={null}
    >
      <Form layout="vertical" className="mt-3" onFinish={onFinish} initialValues={selectedTodo}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter Title" />
            </Form.Item>
          </Col>
            <Col lg={24} xs={24}>
            <Form.Item name="status" label="status" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="done">Done</Option>
          <Option value="not done">Not Done</Option>
        </Select>
      </Form.Item>
            </Col>        
        </Row>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Add Todo
          </button>
        </div>
      </Form>
    </Modal>
  </div>
  )
}

export default TodoForm;