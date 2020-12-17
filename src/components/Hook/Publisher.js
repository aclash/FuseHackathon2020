import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { PatTypeOption } from './index'

const Publisher = ({ publish }) => {
  const [form] = Form.useForm();
  const patTypeOptions = useContext(PatTypeOption);
  const record = {
    topic: 'alerossj',
    patNum: '5',
    patType: 'shoulder'
  };

  const onFinish = (values) => {
    values.alias = values.topic;
    if (values.patType == 'back')
      values.topic = '/cmd/heartchair_alerossj/back';
    else
      values.topic = '/cmd/heartchair_alerossj/shoulder';
    console.log(values);
    publish(values);
  };

  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Alias"
            name="topic"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="# of Pat"
            name="patNum"
          >
             <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="PatType"
            name="patType"
          >
            <Select options={patTypeOptions} />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pat
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Input alias and number of pat"
    >
      {PublishForm}
    </Card>
  );
}

export default Publisher;