class TeamsController < ApplicationController
  before_action :set_team, only: %i[ show update destroy ]

  # GET /teams
  def index
    @teams = Team.all

    render json: @teams
  end

  # GET /teams/[:id]/players
  def players
    @team = Team.find(params[:id])
    @players = @team.players

    render json: @players.as_json(methods: [:latest_skill_level, :full_name])
  end

  # GET /teams/1
  def show
    render json: @team
  end

  # POST /teams
  def create
    @team = Team.new(team_params)

    if @team.save
      render json: @team, status: :created, location: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teams/1
  def update
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/1
  def destroy
    @team.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:team_name, :team_number)
    end
end
