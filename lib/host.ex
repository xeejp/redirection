defmodule Redirection.Host do
  alias Redirection.Main

  def get_filter(data) do
    %{
      experiments: true,
    }
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end

  def redirect(data, src, dest) do
    {:ok, %{data: data, experiment: %{src => %{redirect: dest}}}}
  end

  def refresh(data) do
    Main.refresh data
  end
end
