require "test_helper"

class PlayerSkillLevelsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get player_skill_levels_index_url
    assert_response :success
  end

  test "should get show" do
    get player_skill_levels_show_url
    assert_response :success
  end

  test "should get new" do
    get player_skill_levels_new_url
    assert_response :success
  end

  test "should get edit" do
    get player_skill_levels_edit_url
    assert_response :success
  end
end
