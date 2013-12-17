using UnityEngine;
using System.Collections;

public class gamewon : MonoBehaviour
{
    public GUISkin gui_skin;

    private Rect _gui_group = new Rect(0, 0, 500, 500);

    private Rect _gui_lbl_text = new Rect(20, 20, 460, 370);
    private Rect _gui_btn_quit = new Rect(150, 400, 200, 65);

    void Start()
    {
        _gui_group.x = (Screen.width - 500) * 0.5f;
        _gui_group.y = (Screen.height - 500) * 0.5f;
    }

    void Update()
    {
    }

    void OnGUI()
    {
        GUI.skin = gui_skin;

        GUI.BeginGroup(_gui_group);

        GUI.Label(_gui_lbl_text, "You did it!\nThanks for playing :)");

        GUI.SetNextControlName("0");
        if (GUI.Button(_gui_btn_quit, "Quit"))
        {
            Application.LoadLevel(0);
        }

        GUI.EndGroup();

        GUI.FocusControl("0");
    }
}
