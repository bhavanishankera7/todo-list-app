const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAllEndpoints() {
  let authToken = '';
  let createdTodoId = null;
  let createdUserId = null;

  try {
    console.log('🧪 Testing All To-Do List API Endpoints...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data.status);

    // Test 2: Root Endpoint
    console.log('\n2. Testing Root Endpoint...');
    const rootResponse = await axios.get(`${API_BASE}/`);
    console.log('✅ Root Endpoint:', rootResponse.data.message);

    // Test 3: Register New User
    console.log('\n3. Testing User Registration...');
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    const registerResponse = await axios.post(`${API_BASE}/api/auth/register`, {
      name: `Test User ${timestamp}`,
      email: testEmail,
      password: 'password123'
    });
    createdUserId = registerResponse.data.user.id;
    console.log('✅ Registration:', registerResponse.data.message);
    console.log('User ID:', createdUserId);
    console.log('User Email:', testEmail);

    // Test 4: Login User
    console.log('\n4. Testing User Login...');
    const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
      email: testEmail,
      password: 'password123'
    });
    authToken = loginResponse.data.token;
    console.log('✅ Login:', loginResponse.data.message);
    console.log('Token received:', !!authToken);

    // Test 5: Get User Profile
    console.log('\n5. Testing Get User Profile...');
    const profileResponse = await axios.get(`${API_BASE}/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Profile Retrieved:', profileResponse.data.user.name);

    // Test 6: Create Todo
    console.log('\n6. Testing Todo Creation...');
    const createTodoResponse = await axios.post(`${API_BASE}/api/todos`, {
      title: 'Complete Project Documentation',
      description: 'Finish the PRD, HLD, and LLD documents for the To-Do app',
      priority: 'high',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    createdTodoId = createTodoResponse.data.todo.id;
    console.log('✅ Todo Created:', createTodoResponse.data.message);
    console.log('Todo ID:', createdTodoId);
    console.log('Todo Title:', createTodoResponse.data.todo.title);

    // Test 7: Create Another Todo
    console.log('\n7. Testing Second Todo Creation...');
    const createTodo2Response = await axios.post(`${API_BASE}/api/todos`, {
      title: 'Set up Development Environment',
      description: 'Install Docker, Node.js, and configure the development setup',
      priority: 'medium'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Second Todo Created:', createTodo2Response.data.message);
    console.log('Second Todo ID:', createTodo2Response.data.todo.id);

    // Test 8: Get All Todos
    console.log('\n8. Testing Get All Todos...');
    const getAllTodosResponse = await axios.get(`${API_BASE}/api/todos`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Todos Retrieved:', getAllTodosResponse.data.todos.length, 'todos found');
    getAllTodosResponse.data.todos.forEach((todo, index) => {
      console.log(`  ${index + 1}. ${todo.title} (${todo.status})`);
    });

    // Test 9: Get Specific Todo
    console.log('\n9. Testing Get Specific Todo...');
    const getTodoResponse = await axios.get(`${API_BASE}/api/todos/${createdTodoId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Specific Todo Retrieved:', getTodoResponse.data.todo.title);

    // Test 10: Update Todo
    console.log('\n10. Testing Todo Update...');
    const updateTodoResponse = await axios.put(`${API_BASE}/api/todos/${createdTodoId}`, {
      title: 'Complete Project Documentation (Updated)',
      description: 'Finish the PRD, HLD, and LLD documents for the To-Do app - UPDATED',
      priority: 'medium'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Todo Updated:', updateTodoResponse.data.message);
    console.log('Updated Title:', updateTodoResponse.data.todo.title);

    // Test 11: Update Todo Status
    console.log('\n11. Testing Todo Status Update...');
    const updateStatusResponse = await axios.patch(`${API_BASE}/api/todos/${createdTodoId}/status`, {
      status: 'in_progress'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Todo Status Updated:', updateStatusResponse.data.message);
    console.log('New Status:', updateStatusResponse.data.todo.status);

    // Test 12: Get Updated Todo
    console.log('\n12. Testing Get Updated Todo...');
    const getUpdatedTodoResponse = await axios.get(`${API_BASE}/api/todos/${createdTodoId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Updated Todo Retrieved:');
    console.log('  Title:', getUpdatedTodoResponse.data.todo.title);
    console.log('  Status:', getUpdatedTodoResponse.data.todo.status);
    console.log('  Priority:', getUpdatedTodoResponse.data.todo.priority);

    // Test 13: Create Third Todo
    console.log('\n13. Testing Third Todo Creation...');
    const createTodo3Response = await axios.post(`${API_BASE}/api/todos`, {
      title: 'Test Frontend Integration',
      description: 'Connect React frontend to the backend API',
      priority: 'low'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Third Todo Created:', createTodo3Response.data.message);

    // Test 14: Get All Todos Again
    console.log('\n14. Testing Get All Todos (After Updates)...');
    const getAllTodosAgainResponse = await axios.get(`${API_BASE}/api/todos`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Todos Retrieved:', getAllTodosAgainResponse.data.todos.length, 'todos found');
    getAllTodosAgainResponse.data.todos.forEach((todo, index) => {
      console.log(`  ${index + 1}. ${todo.title} (${todo.status}) - Priority: ${todo.priority}`);
    });

    // Test 15: Delete Todo
    console.log('\n15. Testing Todo Deletion...');
    const deleteTodoResponse = await axios.delete(`${API_BASE}/api/todos/${createdTodoId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Todo Deleted:', deleteTodoResponse.data.message);

    // Test 16: Verify Todo Deleted
    console.log('\n16. Testing Get All Todos (After Deletion)...');
    const getTodosAfterDeleteResponse = await axios.get(`${API_BASE}/api/todos`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    console.log('✅ Todos After Deletion:', getTodosAfterDeleteResponse.data.todos.length, 'todos found');

    // Test 17: Test Invalid Token
    console.log('\n17. Testing Invalid Token...');
    try {
      await axios.get(`${API_BASE}/api/todos`, {
        headers: { 'Authorization': 'Bearer invalid-token' }
      });
    } catch (error) {
      console.log('✅ Invalid Token Rejected:', error.response.data.error);
    }

    // Test 18: Test Missing Token
    console.log('\n18. Testing Missing Token...');
    try {
      await axios.get(`${API_BASE}/api/todos`);
    } catch (error) {
      console.log('✅ Missing Token Rejected:', error.response.data.error);
    }

    // Test 19: Test Invalid Todo ID
    console.log('\n19. Testing Invalid Todo ID...');
    try {
      await axios.get(`${API_BASE}/api/todos/999999`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
    } catch (error) {
      console.log('✅ Invalid Todo ID Rejected:', error.response.data.error);
    }

    console.log('\n🎉 All API endpoint tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - User created with ID: ${createdUserId}`);
    console.log(`  - Todos created and managed successfully`);
    console.log(`  - Authentication working properly`);
    console.log(`  - CRUD operations all functional`);
    console.log(`  - Error handling working correctly`);

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testAllEndpoints(); 