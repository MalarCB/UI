module Api
  class ExperimentController < ApplicationController
    #before_action :find_user, only: [:create]

    def create
      begin
        p params
        p '================'
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
      @experiments = Experiment.all
    end

    private
    def render_content(source ,code)
      if params[:xml] && params[:xml]=="true"
        render xml: source.to_xml(root: 'create' ,skip_types: true) ,status: code
      elsif params[:json] && params[:json] == "true"
        render json: source.as_json(root: 'create' ,skip_types: true) ,status: code
      else
        render xml: source.to_xml(root: 'create' ,skip_types: true) ,status: code
      end
    end
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
