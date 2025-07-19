const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  try {
    console.log('🧪 Testing To-Do List API...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);

    // Test 2: Register User
    console.log('\n2. Testing User Registration...');
    const registerResponse = await axios.post(`${API_BASE}/api/auth/register`, {
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'password123'
    });
    console.log('✅ Registration:', registerResponse.data.message);
    console.log('User ID:', registerResponse.data.user.id);

    // Test 3: Login User
    console.log('\n3. Testing User Login...');
    const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
      email: 'test2@example.com',
      password: 'password123'
    });
    console.log('✅ Login:', loginResponse.data.message);
    console.log('Token received:', !!loginResponse.data.token);

    // Test 4: Create Todo (with authentication)
    console.log('\n4. Testing Todo Creation...');
    const token = loginResponse.data.token;
    const todoResponse = await axios.post(`${API_BASE}/api/todos`, {
      title: 'Test Todo',
      description: 'This is a test todo item',
      priority: 'medium'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Todo Created:', todoResponse.data.message);
    console.log('Todo ID:', todoResponse.data.todo.id);

    // Test 5: Get All Todos
    console.log('\n5. Testing Get All Todos...');
    const todosResponse = await axios.get(`${API_BASE}/api/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Todos Retrieved:', todosResponse.data.todos.length, 'todos found');

    console.log('\n🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
  }
}

testAPI(); 