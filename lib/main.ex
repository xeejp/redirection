defmodule Redirection.Main do
  alias Redirection.Host

  def init do
    %{
      participants: %{},
      participants_number: 0,
    }
  end

  def new_participant do
    %{
      id: nil
    }
  end

  def join(data, id), do: data

  def compute_diff(old, %{data: new} = result) do
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    result
    |> Map.put(:data, new)
    |> Map.put(:host, host)
  end
end
