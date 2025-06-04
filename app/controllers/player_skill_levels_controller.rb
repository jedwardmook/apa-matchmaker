class PlayerSkillLevelsController < ApplicationController
  def index
    @player_skill_levels = PlayerSkillLevel.all

    render json: @player_skill_levels
  end

  def show
    @player_skill_level = PlayerSkillLevel.find(params[:id])

    render json: @player_skill_level  
  end

  def create
    @player_skill_level = PlayerSkillLevel.new(player_skill_level_params)

    if @player_skill_level.save
      render json: @player_skill_level, status: :created, location: @player_skill_level
    else
      render json: @player_skill_level.errors, status: :unprocessable_entity
    end
  end

  private
  def player_skill_level_params
    params.require(:player_skill_level).permit(:player_id, :skill_level, :match_id)
  end
end
