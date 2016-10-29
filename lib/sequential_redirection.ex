defmodule Redirection do
  use XeeThemeScript
  require Logger
  alias Redirection.Main
  alias Redirection.Host

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{data: Main.init()}}
  end

  def join(data, id) do
    wrap_result(data, data)
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Redirection] #{action} #{inspect params}")
    result = case {action, params} do
      {"redirect", %{"from" => src, "to" => dest}} -> Host.redirect(data, src, dest)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Utilities
  def wrap_result(old, {:ok, result}) do
    {:ok, Main.compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, Main.compute_diff(old, %{data: new})}
  end
end
