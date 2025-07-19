const { testConnection } = require('./src/config/database');

console.log('🔍 Testing database connection...');

testConnection()
  .then(() => {
    console.log('✅ Database connection test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection test failed:', error.message);
    process.exit(1);
  }); 