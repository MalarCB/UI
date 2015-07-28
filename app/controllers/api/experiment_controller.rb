module API
  class ExperimentController < ApplicationController
    before_action :find_user, only: [:create]

    def create
      begin
        @experiment = Experiment.new(experiment_params)
        if @experiment.save
          render_content(@experiment,'201')
        else
          render_content({errors: @experiment.errors},'422')
        end
      rescue => e
        render_content({errors: e},'400')
      end
    end

    def index
      @experiment = Experiment.all
    end

    private
    def find_user
      if params[:token].present?
        user = User.find(token: params[:token])
        @experiment.user_id = user.id
      end
    end

    def experiment_params
      params.require(:experiment).permit(:page, :site_domain, :content, :user_id)
    end
  end
end
