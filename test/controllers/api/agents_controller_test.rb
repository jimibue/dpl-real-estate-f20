require 'test_helper'

class Api::AgentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_agents_index_url
    assert_response :success
  end

end
