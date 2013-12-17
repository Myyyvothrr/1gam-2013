using UnityEngine;
using System.Collections;

public class gameover : MonoBehaviour
{
    public GUISkin gui_skin;

    public int FIRST_LEVEL = 1;

    private Rect _gui_group = new Rect(0, 0, 500, 500);

    private Rect _gui_lbl_text = new Rect(20, 20, 460, 290);
    private Rect _gui_btn_tryagain = new Rect(150, 320, 200, 65);
    private Rect _gui_btn_quit = new Rect(150, 400, 200, 65);

    private string[] _button_names = { "0", "1" };
    private int _index = 0;
    
    void Start()
    {
        _gui_group.x = (Screen.width - 500) * 0.5f;
        _gui_group.y = (Screen.height - 500) * 0.5f;
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
        {
            _index--;
            if (_index < 0)
                _index = _button_names.Length - 1;
        }
        else if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
        {
            _index++;
            if (_index >= _button_names.Length)
                _index = 0;
        }
    }

    void OnGUI()
    {
        GUI.skin = gui_skin;

        GUI.BeginGroup(_gui_group);

        GUI.Label(_gui_lbl_text, "You failed :(");

        GUI.SetNextControlName(_button_names[0]);
        if (GUI.Button(_gui_btn_tryagain, "Play"))
        {
            Application.LoadLevel(FIRST_LEVEL);
        }

        GUI.SetNextControlName(_button_names[1]);
        if (GUI.Button(_gui_btn_quit, "Quit"))
        {
            Application.LoadLevel(0);
        }

        GUI.EndGroup();

        GUI.FocusControl(_button_names[_index]);
    }
}
